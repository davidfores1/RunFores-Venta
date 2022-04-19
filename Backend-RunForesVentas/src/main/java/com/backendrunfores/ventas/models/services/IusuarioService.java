package com.backendrunfores.ventas.models.services;

import com.backendrunfores.ventas.models.entity.Usuario;

public interface IusuarioService {
	
	public Usuario findByUsername(String usename);

}
