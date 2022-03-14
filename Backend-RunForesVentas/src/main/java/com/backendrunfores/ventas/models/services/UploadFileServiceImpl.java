package com.backendrunfores.ventas.models.services;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class UploadFileServiceImpl implements IUploadFileService {

	private final Logger log = LoggerFactory.getLogger(UploadFileServiceImpl.class);
	private final static String DIRECTORY_UPLOAD = "uploads";

	@Override
	public Resource loadPhotoName(String phoneName) throws MalformedURLException {

		Path routeFile = getPath(phoneName);
		log.info(routeFile.toString());
		Resource resource = null;

		resource = new UrlResource(routeFile.toUri());

		if (!resource.exists() && !resource.isReadable()) {
			routeFile = Paths.get("src/main/resources/static/images").resolve("not_user.png").toAbsolutePath();

			log.error("Error, no se pudo cargar la imagen: " + phoneName);
		}

		return resource;
	}

	@Override
	public String copyFile(MultipartFile file) throws IOException {

		String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename().replace(" ", " ");
		Path routeFile = getPath(fileName);

		Files.copy(file.getInputStream(), routeFile);

		return fileName;
	}

	@Override
	public boolean deletePhoto(String namePhoto) {
        if(namePhoto != null && namePhoto.length()>0){
            Path previousRoutePhoto = Paths.get("uploads").resolve(namePhoto).toAbsolutePath();
            File previousFilePhoto = previousRoutePhoto.toFile();

            if(previousFilePhoto.exists() && previousFilePhoto.canRead()){
                previousFilePhoto.delete();
                
                return true;
            }
        }
		return false;
	}

	@Override
	public Path getPath(String phoneName) {
		// TODO Auto-generated method stub
		return Paths.get(DIRECTORY_UPLOAD).resolve(phoneName).toAbsolutePath();
	}

}
