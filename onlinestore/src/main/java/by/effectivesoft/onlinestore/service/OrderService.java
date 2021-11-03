package by.effectivesoft.onlinestore.service;

import by.effectivesoft.onlinestore.dao.CartDao;
import by.effectivesoft.onlinestore.dao.OrderDao;
import by.effectivesoft.onlinestore.exceptions.ServiceException;
import by.effectivesoft.onlinestore.model.Cart;
import by.effectivesoft.onlinestore.model.Order;
import by.effectivesoft.onlinestore.model.OrderStatus;
import by.effectivesoft.onlinestore.model.Product;
import by.effectivesoft.onlinestore.model.dto.OrderDto;
import by.effectivesoft.onlinestore.model.dto.ProductDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final CartDao cartDao;
    private final OrderDao orderDao;
    private final ModelMapper mapper;

    @Autowired
    public OrderService(CartDao cartDao, OrderDao orderDao, ModelMapper mapper) {
        this.cartDao = cartDao;
        this.orderDao = orderDao;
        this.mapper = mapper;
    }

    public List<OrderDto> getAllOrders(Integer page, Integer size, String sortBy, String direction) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.Direction.fromString(direction), sortBy);
        List<Order> orders = orderDao.findAll(pageRequest).toList();
        if (orders.isEmpty()) {
            throw new ServiceException("There is no orders");
        }
        return orders.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public Long count() {
        return orderDao.count();
    }

    public OrderDto createOrder(Long cartId) {
        Cart cart = cartDao.findById(cartId).orElseThrow(() -> new ServiceException("Cart with Id " + cartId + " not found"));
        Order order = new Order();
        order.setId(100L);
        order.setProducts(cart.getProducts());
        order.setCount(cart.getProducts().size());
        List<Product> products = cart.getProducts();
        Integer total = 0;
        for (Product product : products) {
            total += product.getPrice();
        }
        order.setPrice(total);
        order.setStatus(OrderStatus.CREATED);
        orderDao.save(order);
        cart.getProducts().clear();
        cartDao.save(cart);
        return convertToDto(order);
    }

    public OrderDto getOrderById(Long id) {
        OrderDto orderDto = new OrderDto();
        Order order = orderDao.findById(id).orElseThrow(() -> new ServiceException("Order with Id " + id + " not found"));
        orderDto.setId(order.getId());
        orderDto.setProductDtos(order.getProducts().stream()
                .map(this::convertToDtoProduct)
                .collect(Collectors.toList()));
        orderDto.setCount(order.getCount());
        orderDto.setPrice(order.getPrice());
        orderDto.setStatus(order.getStatus());
        orderDto.setCreatedBy(order.getCreatedBy());
        return orderDto;
    }

    public void deleteOrder(Long orderId) {
        orderDao.deleteById(orderId);
    }

    public OrderDto payForOrder(Long id) {
        Order order = orderDao.findById(id).orElseThrow(() -> new ServiceException("Order with Id " + id + " not found"));
        order.setStatus(OrderStatus.PAID);
        return convertToDto(orderDao.save(order));
    }

    private OrderDto convertToDto(Order order) {
        return mapper.map(order, OrderDto.class);
    }

    private ProductDto convertToDtoProduct(Product product) {
        return mapper.map(product, ProductDto.class);
    }
}
