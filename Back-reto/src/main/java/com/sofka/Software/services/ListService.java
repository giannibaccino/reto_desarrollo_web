package com.sofka.Software.services;

import com.sofka.Software.models.ListModel;
import com.sofka.Software.repositories.ListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class ListService {
    @Autowired
    private ListRepository listRepository;

    public Iterable<ListModel> list(){
        return listRepository.findAll();
    }

    /**
     * metodo crear lista
     * @param lista
     * @return
     */
    public ListModel createList(ListModel lista){
        return listRepository.save(lista);
    }

    /**
     * metodo eliminar lista
     * @param id
     */
    public void deleteTask(Long id){ listRepository.delete(get(id)); }

    /**
     * verificar si el id esta entonces lo retorne , si no retorne error
     * @param id
     * @return
     */
    public ListModel get(Long id){
        return listRepository.findById(id).orElseThrow();
    }
}
