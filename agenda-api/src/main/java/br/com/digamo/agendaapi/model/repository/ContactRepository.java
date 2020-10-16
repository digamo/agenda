package br.com.digamo.agendaapi.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.digamo.agendaapi.model.entity.Contact;

public interface ContactRepository extends JpaRepository<Contact, Long>{

}
