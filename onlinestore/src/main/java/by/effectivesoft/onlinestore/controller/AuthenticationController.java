package by.effectivesoft.onlinestore.controller;

import by.effectivesoft.onlinestore.model.User;
import by.effectivesoft.onlinestore.model.dto.AuthenticationRequestDto;
import by.effectivesoft.onlinestore.security.JwtTokenProvider;
import by.effectivesoft.onlinestore.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

@RestController
public class AuthenticationController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    public AuthenticationController(UserService userService, AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody AuthenticationRequestDto requestDto) {
        try {
            String username=requestDto.getEmail();
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(requestDto.getEmail(), requestDto.getPassword()));
            User user = userService.findByEmail(requestDto.getEmail());
            System.out.println(user.getRoles());
            String token=jwtTokenProvider.createToken(username,user.getRoles());
            Map<Object,Object> response=new HashMap<>();
            response.put("email",username);
            response.put("token",token);
            return ResponseEntity.ok(response);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
