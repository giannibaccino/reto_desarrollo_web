package com.sofka.Software.services;

import com.sofka.Software.models.ListTaskModel;

public interface IListTaskServices {
    Iterable<ListTaskModel> list();
    ListTaskModel createListTask(ListTaskModel listTask);
    void deleteListTask(Long id);
    ListTaskModel get(Long id);
    ListTaskModel updateListTask(Long id, ListTaskModel listTask);
}
