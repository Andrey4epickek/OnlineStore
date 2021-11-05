package by.effectivesoft.onlinestore.controller;

import by.effectivesoft.onlinestore.model.dto.OrderDto;
import by.effectivesoft.onlinestore.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
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
    public List<OrderDto> getAllOrders(Principal principal, @RequestParam Integer page, @RequestParam Integer size, @RequestParam String sortBy, @RequestParam String direction) {
        return orderService.getAllOrders(principal.getName(), page, size, sortBy, direction);
    }

    @PreAuthorize("hasAnyAuthority('ADMIN','ADMIN_READ_ONLY')")
    @GetMapping("/admin")
    public List<OrderDto> getAllOrdersAdmin(@RequestParam Integer page, @RequestParam Integer size, @RequestParam String sortBy, @RequestParam String direction) {
        return orderService.getAllOrdersAdmin(page, size, sortBy, direction);
    }

    @GetMapping("/total")
    public Long getTotal() {
        return orderService.count();
    }

    @PreAuthorize("hasAnyAuthority('ADMIN','USER')")
    @PostMapping("/{cartId}")
    public OrderDto createOrder(@PathVariable("cartId") Long cartId) {
        return orderService.createOrder(cartId);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable("id") Long id) {
        orderService.getOrderById(id);
        orderService.deleteOrder(id);
    }

    @GetMapping("/{id}")
    public OrderDto getOrderById(@PathVariable("id") Long id) {
        return orderService.getOrderById(id);
    }

    @PreAuthorize("hasAnyAuthority('ADMIN','USER')")
    @PutMapping("/payment/{orderId}")
    public OrderDto payForOrder(@PathVariable("orderId") Long id) {
        return orderService.payForOrder(id);
    }
}
