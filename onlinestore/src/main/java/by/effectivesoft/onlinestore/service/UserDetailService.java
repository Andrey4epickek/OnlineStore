//package by.effectivesoft.onlinestore.service;
//
//import by.effectivesoft.onlinestore.model.Role;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.User;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//@Service
//public class UserDetailService implements UserDetailsService {
//
//    private final UserService userService;
//
//    @Autowired
//    public UserDetailService(UserService userService) {
//        this.userService = userService;
//    }
//
//    @Override
//    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
//        final by.effectivesoft.onlinestore.model.User user = userService.findByEmail(s);
//        if (user==null) {
//            throw new UsernameNotFoundException(s);
//        }
//        by.effectivesoft.onlinestore.model.User userAuth = user;
//        return User.withUsername(userAuth.getEmail()).password(userAuth.getPassword()).authorities(String.valueOf(userAuth.getRole())).build();
//    }
//}
