package com.sofka.Software.services;

import com.sofka.Software.models.ListTaskModel;
import com.sofka.Software.repositories.ListTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class ListTaskService implements IListTaskServices{
    @Autowired
    private ListTaskRepository listTaskRepository;
    public Iterable<ListTaskModel> list(){
        return listTaskRepository.findAll();
    }

    /**
     * Crea las subTareas en la lisa principal
     * @param listTask
     * @return
     */
    public ListTaskModel createListTask(ListTaskModel listTask){
        listTask.setCompleted(false);
        return listTaskRepository.save(listTask);
    }

    /**
     * metodo eliminar subtarea
     * @param id
     */
    public void deleteListTask(Long id){
        listTaskRepository.delete(get(id));
    }
    /**
     * verificar si el id esta entonces lo retorne , si no retorne error
     * @param id
     * @return
     */
    public ListTaskModel get(Long id){
        return listTaskRepository.findById(id).orElseThrow();
    }

    /**
     * metodo actualizar subtarea, me permite actualizar la lista
     * @param id
     * @param listTask
     * @return
     */
    @Transactional
    public ListTaskModel updateListTask(Long id, ListTaskModel listTask) {
        listTask.setId(id);
        return listTaskRepository.save(listTask);
    }
}
