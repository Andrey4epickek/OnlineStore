package by.effectivesoft.onlinestore.service;

import by.effectivesoft.onlinestore.dao.RoleDao;
import by.effectivesoft.onlinestore.dao.UserDao;
import by.effectivesoft.onlinestore.exceptions.ServiceException;
import by.effectivesoft.onlinestore.model.Role;
import by.effectivesoft.onlinestore.model.User;
import by.effectivesoft.onlinestore.model.dto.UserDto;
import by.effectivesoft.onlinestore.util.FileUploadUtil;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Validated
public class UserService {

    private final UserDao userDao;
    private final RoleDao roleDao;
    private final ModelMapper mapper;

    @Autowired
    public UserService(UserDao userDao,RoleDao roleDao, ModelMapper mapper) {
        this.userDao = userDao;
        this.roleDao = roleDao;
        this.mapper = mapper;
    }

    public UserDto createUser(@Valid UserDto userDto, MultipartFile multipartFile) {
        try {
            String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
            List<Role> roles = new ArrayList<>();
            roles.add(roleDao.getById(2L));
            User user = userDao.save(new User(userDto.getId(), userDto.getFirstName(), userDto.getLastName(), userDto.getDateOfBirth(), userDto.getEmail(), userDto.getPassword(), fileName, userDto.getPhoneNumber(), roles));
            FileUploadUtil.saveFile(user.getId(), fileName, multipartFile);
            return convertToDto(user);
        } catch (IOException e) {
            throw new ServiceException("Adding of user failed", e);
        }
    }

    public List<UserDto> getAllUsers(Integer page, Integer size, String sortBy, String direction) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.Direction.fromString(direction), sortBy);
        List<User> users = userDao.findAll(pageRequest).toList();
        if (users.isEmpty()) {
            throw new ServiceException("There is no users");
        }
        return users.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public UserDto getUserById(Long id) {
        return convertToDto(userDao.findById(id)
                .orElseThrow(() -> new ServiceException("User with Id " + id + " not found")));
    }

    public long count() {
        return userDao.count();
    }

    public Resource getImage(Long id) {
        try {
            Optional<User> user = userDao.findById(id);
            Path rootLocation = Paths.get(String.valueOf(FileUploadUtil.folderLevels(id)));
            Path file = rootLocation.resolve(user.get().getPhoto());
            Resource resource = new UrlResource(file.toUri());
            return resource;
        } catch (MalformedURLException e) {
            throw new ServiceException("Getting of image failed", e);
        }
    }

    public User findByEmail(String email) {
        return userDao.findByEmail(email).orElseThrow(() -> new ServiceException("User with email " + email + " not found"));
    }

    public UserDto updateUser(@Valid UserDto userDto, MultipartFile multipartFile) {
        try {
            String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
            User user =userDao.findById(userDto.getId()).orElseThrow(() -> new ServiceException("User with Id " + userDto.getId() + " not found"));
            user.setFirstName(userDto.getFirstName());
            user.setLastName(userDto.getLastName());
            user.setDateOfBirth(userDto.getDateOfBirth());
            user.setEmail(userDto.getEmail());
            user.setPassword(userDto.getPassword());
            user.setPhoto(fileName);
            user.setPhoneNumber(userDto.getPhoneNumber());

            FileUploadUtil.saveFile(user.getId(), fileName, multipartFile);

            return convertToDto(userDao.save(user));
        } catch (IOException e) {
            throw new ServiceException("Updating of user failed", e);
        }
    }

    public void deleteUser(Long userId) {
        userDao.deleteById(userId);
    }

    private UserDto convertToDto(User user) {
        return mapper.map(user, UserDto.class);
    }
}
