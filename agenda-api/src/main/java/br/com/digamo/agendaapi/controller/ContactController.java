package br.com.digamo.agendaapi.controller;

import java.io.IOException;
import java.io.InputStream;
import java.util.Optional;

import javax.servlet.http.Part;

import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.digamo.agendaapi.model.entity.Contact;
import br.com.digamo.agendaapi.model.repository.ContactRepository;

@RestController
@RequestMapping("/api/contacts")
@CrossOrigin("*") // configuração para aceitar requisição de outros domínios
public class ContactController {

	@Autowired
	private ContactRepository repository;
	
	/**
	 * Persiste o objeto contact passado como parametro
	 * @param contact
	 * @return
	 */
	@PostMapping
	@ResponseStatus(value = HttpStatus.CREATED)
	public Contact save ( @RequestBody Contact contact) {
		
		return repository.save(contact);
	}
	
	/**
	 * @param id que será deletado
	 */
	@DeleteMapping("{id}")
	//Indica que não há conteúdo de retorno
	@ResponseStatus(value = HttpStatus.NO_CONTENT)
	public void delete ( @PathVariable Long id ) {
		
		repository.deleteById(id);
	}
	
	/**
	 * Lista todos os contatos
	 * @return 
	 */
	@GetMapping
	public Page<Contact> list(
			@RequestParam(value = "page", defaultValue = "0" ) Integer page,
			@RequestParam(value = "size", defaultValue = "10" ) Integer size){
		
		Sort sort = Sort.by(Sort.Direction.ASC, "name");
		PageRequest pageRequest =  PageRequest.of(page, size, sort);
		
		return repository.findAll(pageRequest);
		
	}
	
	/**
	 * Atualiza o atributo favorito de acordo com o parametro id
	 * O método Patch é utilizado para fazer uma atualização parcial no objeto
	 * @param id
	 * @param favorite
	 */
	@PatchMapping("/favorite/{id}")
	public void favorite ( @PathVariable Long id) {
		
		Optional<Contact> contact = repository.findById(id);
		contact.ifPresent(c -> {
			boolean favorite = c.getFavorite() == Boolean.TRUE; 
			c.setFavorite(!favorite);
			repository.save(c);
		});
		
	}

	/**
	 * Atualiza o atributo photo de acordo com o parametro id
	 * @param id
	 * @param favorite
	 */
	@PutMapping("/photo/{id}")
	public byte[] addPhoto ( @PathVariable Long id, 
							 @RequestParam("photo") Part file ) {
		
		Optional<Contact> contact = repository.findById(id);
		
		//O "contact.map" irá mapiar o objeto "c" para um arry de bytes
		return contact.map( c -> {
			
			byte[] bytes = new byte[(int) file.getSize()];

			try ( InputStream inputStream = file.getInputStream(); ) 
			{
				//O método readFully irá enviar o inputStream para o array de bytes 
				IOUtils.readFully(inputStream, bytes);

				c.setPhoto(bytes);
				repository.save(c);
				
				return bytes;
				
			} catch (IOException e) {
				return null;
			}
			
		}).orElse(null);
	}

	
}
