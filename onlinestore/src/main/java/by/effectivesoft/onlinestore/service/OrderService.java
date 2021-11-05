package by.effectivesoft.onlinestore.service;

import by.effectivesoft.onlinestore.dao.CartDao;
import by.effectivesoft.onlinestore.dao.CartProductDao;
import by.effectivesoft.onlinestore.dao.OrderDao;
import by.effectivesoft.onlinestore.dao.OrderProductDao;
import by.effectivesoft.onlinestore.exceptions.ServiceException;
import by.effectivesoft.onlinestore.model.*;
import by.effectivesoft.onlinestore.model.dto.OrderDto;
import by.effectivesoft.onlinestore.model.dto.OrderProductDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final CartDao cartDao;
    private final OrderDao orderDao;
    private final OrderProductDao orderProductDao;
    private final CartProductDao cartProductDao;
    private final ModelMapper mapper;

    @Autowired
    public OrderService(CartDao cartDao, OrderDao orderDao,OrderProductDao orderProductDao,CartProductDao cartProductDao, ModelMapper mapper) {
        this.cartDao = cartDao;
        this.orderDao = orderDao;
        this.orderProductDao = orderProductDao;
        this.cartProductDao = cartProductDao;
        this.mapper = mapper;
    }

    public List<OrderDto> getAllOrdersAdmin(Integer page, Integer size, String sortBy, String direction) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.Direction.fromString(direction), sortBy);
        List<Order> orders = orderDao.findAll(pageRequest).toList();
        if (orders.isEmpty()) {
            throw new ServiceException("There is no orders");
        }
        return orders.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<OrderDto> getAllOrders(String userEmail, Integer page, Integer size, String sortBy, String direction) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.Direction.fromString(direction), sortBy);
        List<Order> orders = orderDao.findByCreatedBy(userEmail, pageRequest).toList();
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
        Order order = orderDao.save(new Order());
        Cart cart = cartDao.findById(cartId).orElseThrow(() -> new ServiceException("Cart with Id " + cartId + " not found"));
        List<OrderProduct> orderProducts = new ArrayList<>();
        for (CartProduct cartProduct : cart.getCartProducts()) {
            OrderProduct orderProduct = orderProductDao.save(new OrderProduct(order, cartProduct.getProduct(), cartProduct.getQuantity()));
            orderProducts.add(orderProduct);
        }
        order.setOrderProducts(orderProducts);
        int sum = 0;
        List<OrderProduct> orderProductsPrice = order.getOrderProducts();
        for (OrderProduct op : orderProductsPrice) {
            sum += op.getProduct().getPrice() * op.getQuantity();
        }
        order.setPrice(sum);
        order.setStatus(OrderStatus.CREATED);
        orderDao.save(order);
        cartProductDao.deleteAll();
        return convertToDto(order);
    }

    public OrderDto getOrderById(Long id) {
        OrderDto orderDto = new OrderDto();
        Order order = orderDao.findById(id).orElseThrow(() -> new ServiceException("Order with Id " + id + " not found"));
        orderDto.setId(order.getId());
        orderDto.setProductDtos(order.getOrderProducts().stream()
                .map(this::convertToDtoProduct)
                .collect(Collectors.toList()));
        orderDto.setPrice(order.getPrice());
        orderDto.setStatus(order.getStatus());
        orderDto.setCreatedBy(order.getCreatedBy());
        return orderDto;
    }

    public void deleteOrder(Long orderId) {
        List<OrderProduct> orderProducts = orderProductDao.findAll();
        for (OrderProduct orderProduct : orderProducts) {
            if (orderProduct.getPk().getOrder().getId().equals(orderId)) {
                orderProductDao.delete(orderProduct);
            }
        }
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

    private OrderProductDto convertToDtoProduct(OrderProduct orderProduct) {
        return mapper.map(orderProduct, OrderProductDto.class);
    }
}
