package by.effectivesoft.onlinestore.controller;

import by.effectivesoft.onlinestore.model.dto.UserDto;
import by.effectivesoft.onlinestore.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<UserDto> getAllUsers(@RequestParam Integer page, @RequestParam Integer size, @RequestParam String sortBy, @RequestParam String direction) {
        return userService.getAllUsers(page, size, sortBy, direction);
    }

    @GetMapping("/total")
    public Long getTotal() {
        return userService.count();
    }

    @PreAuthorize("#id == authentication.principal.id or hasAnyAuthority('ADMIN','ADMIN_READ_ONLY')")
    @GetMapping("/{id}")
    public UserDto getUserById(@PathVariable("id") Long id) {
        return userService.getUserById(id);
    }

    @GetMapping("/{id}/image")
    public Resource getUserImage(@PathVariable("id") Long id) {
        return userService.getImage(id);
    }

    @PostMapping
    public UserDto createUser(@RequestPart("userDto") UserDto userDto, @RequestPart("photo") MultipartFile multipartFile) {
        return userService.createUser(userDto, multipartFile);
    }

    @PreAuthorize("#userDto.getId() == authentication.principal.id or hasAuthority('ADMIN')")
    @PutMapping
    public UserDto updateUser(@RequestPart UserDto userDto, @RequestPart("photo") MultipartFile multipartFile) {
        return userService.updateUser(userDto, multipartFile);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable("id") Long id) {
        userService.getUserById(id);
        userService.deleteUser(id);
    }
}
