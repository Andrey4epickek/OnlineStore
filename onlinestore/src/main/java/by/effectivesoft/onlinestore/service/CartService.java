package by.effectivesoft.onlinestore.service;

import by.effectivesoft.onlinestore.dao.CartDao;
import by.effectivesoft.onlinestore.dao.CartProductDao;
import by.effectivesoft.onlinestore.dao.ProductDao;
import by.effectivesoft.onlinestore.exceptions.ServiceException;
import by.effectivesoft.onlinestore.model.Cart;
import by.effectivesoft.onlinestore.model.CartProduct;
import by.effectivesoft.onlinestore.model.CartProductPK;
import by.effectivesoft.onlinestore.model.Product;
import by.effectivesoft.onlinestore.model.dto.CartDto;
import by.effectivesoft.onlinestore.model.dto.CartProductDto;
import by.effectivesoft.onlinestore.model.dto.ProductDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CartService {

    private final CartDao cartDao;
    private final ProductDao productDao;
    private final CartProductDao cartProductDao;
    private final ModelMapper mapper;

    @Autowired
    public CartService(CartDao cartDao, ProductDao productDao, CartProductDao cartProductDao, ModelMapper mapper) {
        this.cartDao = cartDao;
        this.productDao = productDao;
        this.cartProductDao = cartProductDao;
        this.mapper = mapper;
    }

    public List<CartDto> getAllCarts(Integer page, Integer size, String sortBy, String direction) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.Direction.fromString(direction), sortBy);
        List<Cart> carts = cartDao.findAll(pageRequest).toList();
        if (carts.isEmpty()) {
            throw new ServiceException("There is no carts");
        }
        return carts.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public CartDto createCart() {
        Cart cart = cartDao.save(new Cart());
        return convertToDto(cart);
    }

    public Integer countTotalPrice(String userEmail) {
        Cart cart = cartDao.findByCreatedBy(userEmail).orElseThrow(() -> new ServiceException("Cart with userEmail " + userEmail + " not found"));
        List<CartProduct> cartProducts = cart.getCartProducts();
        int sum = 0;
        for (CartProduct cp : cartProducts) {
            sum += cp.getProduct().getPrice() * cp.getQuantity();
        }
        return sum;
    }

    public CartDto getCartByUserEmail(String userEmail) {
        CartDto cartDto = new CartDto();
        Cart cart = cartDao.findByCreatedBy(userEmail).orElseThrow(() -> new ServiceException("Cart with userEmail " + userEmail + " not found"));
        cartDto.setId(cart.getId());
        cartDto.setProductDtos(cart.getCartProducts().stream()
                .map(this::convertToDtoProduct)
                .collect(Collectors.toList()));
        return cartDto;
    }

    public void addProductToCart(String userEmail, Long productId) {
        Product product = productDao.findById(productId).orElseThrow(() -> new ServiceException("Product with Id " + productId + " not found"));
        if (cartDao.findByCreatedBy(userEmail).isEmpty()) {
            Cart cart = new Cart();
            cartDao.save(cart);
            CartProduct cartProduct = new CartProduct(cart, product, 1);
            cartProductDao.save(cartProduct);
        } else {
            Cart cart = cartDao.findByCreatedBy(userEmail).get();
            CartProduct cartProductGet = new CartProduct(cart, product, 1);
            CartProductPK cartProductPK = new CartProductPK(cart, product);
            Optional<CartProduct> cartProduct = cartProductDao.findByPk(cartProductPK);
            if (cartProduct.isPresent()) {
                cartProduct.get().setQuantity(cartProduct.get().getQuantity() + 1);
                cartProductDao.save(cartProduct.get());
            } else {
                cartProductDao.save(cartProductGet);
            }
        }
    }

    public CartDto deleteProductFromCart(Long cartId, Long productId) {
        Cart cart = cartDao.findById(cartId).orElseThrow(() -> new ServiceException("Cart with Id " + cartId + " not found"));
        Product product = productDao.findById(productId).orElseThrow(() -> new ServiceException("Product with Id " + productId + " not found"));
        CartProductPK cartProductPK = new CartProductPK(cart, product);
        CartProduct cartProduct = cartProductDao.findByPk(cartProductPK).orElseThrow(() -> new ServiceException("CartProduct with cartId " + cartId + " not found"));
        if (cartProduct.getQuantity() > 1) {
            cartProduct.setQuantity(cartProduct.getQuantity() - 1);
            cartProductDao.save(cartProduct);
        } else {
            cartProductDao.delete(cartProduct);
        }
        return convertToDto(cartDao.save(cart));
    }

    public CartDto clearCart(Long id) {
        Cart cart = cartDao.findById(id).orElseThrow(() -> new ServiceException("Cart with Id " + id + " not found"));
        List<CartProduct> cartProducts = cartProductDao.findAll();
        for (CartProduct cartProduct : cartProducts) {
            if (cartProduct.getPk().getCart().getId().equals(cart.getId())) {
                cartProductDao.delete(cartProduct);
            }
        }
        return convertToDto(cartDao.save(cart));
    }

    private CartDto convertToDto(Cart cart) {
        return mapper.map(cart, CartDto.class);
    }

    private Product convertToProduct(ProductDto productDto) {
        return mapper.map(productDto, Product.class);
    }

    private CartProductDto convertToDtoProduct(CartProduct cartProduct) {
        return mapper.map(cartProduct, CartProductDto.class);
    }

}
