package com.backendrunfores.ventas.models.services;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface IUploadFileService {
	
	public  Resource loadPhotoName(String namePhoto) throws MalformedURLException; 
	public  String copyFile(MultipartFile file) throws IOException;
	public boolean deletePhoto(String namePhoto);
	public Path getPath(String namePhoto);

}
