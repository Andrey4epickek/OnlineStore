package by.effectivesoft.onlinestore.controller;

import by.effectivesoft.onlinestore.model.dto.OrderDto;
import by.effectivesoft.onlinestore.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {

    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping
    public List<OrderDto> getAllOrders(@RequestParam Integer page, @RequestParam Integer size, @RequestParam String sortBy, @RequestParam String direction) {
        return orderService.getAllOrders(page, size, sortBy, direction);
    }

    @GetMapping("/total")
    public Long getTotal() {
        return orderService.count();
    }

    @PostMapping("/{cartId}")
    public OrderDto createOrder(@PathVariable("cartId") Long cartId) {
        return orderService.createOrder(cartId);
    }

    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable("id") Long id) {
        orderService.getOrderById(id);
        orderService.deleteOrder(id);
    }

    @GetMapping("/{id}")
    public OrderDto getOrderById(@PathVariable("id") Long id) {
        return orderService.getOrderById(id);
    }

    @PutMapping("/payment/{orderId}")
    public OrderDto payForOrder(@PathVariable("orderId") Long id) {
        return orderService.payForOrder(id);
    }
}
