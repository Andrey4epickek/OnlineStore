package by.effectivesoft.onlinestore.util;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

public class FileUploadUtil {

    public static final String UPLOAD_DIR = "user-photos/";

    public static StringBuilder folderLevels(Long userId) {

        StringBuilder uploadDir = new StringBuilder();

        uploadDir.append(UPLOAD_DIR);

        String number = String.valueOf(userId);
        for (int i = 0; i < number.length(); i++) {
            int j = Character.digit(number.charAt(i), 10);
            uploadDir.append(j).append("/");
        }

        return uploadDir;
    }

    public static void saveFile(Long userId, String fileName, MultipartFile multipartFile) throws IOException {

        StringBuilder uploadDir = folderLevels(userId);

        Path uploadPath = Paths.get(String.valueOf(uploadDir));

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        try (InputStream inputStream = multipartFile.getInputStream()) {
            Path filePath = uploadPath.resolve(fileName);

            System.out.println(filePath.toFile().getAbsolutePath());
            Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new IOException("Could not save uploaded file: " + fileName);
        }
    }
}
