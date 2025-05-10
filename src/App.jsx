// json-server --watch src/db.json --port 3004 --delay 1000

// 2. Переделать приложение, заменив JSON Placeholder на JSON Server:

// DONE!!! начальный список дел отсутствует (пустой массив);

// DONE!!! реализовать CRUD-операции, добавить возможность добавления, изменения и удаления дела;

// Добавить пользовательские хуки

// реализовать поиск дел по заданной фразе (для нахождения элемента в тексте дела должен быть совпадающий с введенной фразой фрагмент);

// реализовать кнопку для включения режима сортировки дел по алфавиту, если кнопка не нажата — изначальная сортировка (т. е. отсутствие сортировки).

// Дополнительно. Реализовать продвинутый поиск с помощью debounce().

import { useState } from 'react';
import styles from './app.module.css';
import { useGetItems, useAddItem, useChangeItem, useDeleteItem } from './hooks/index';

const AppLayout = ({todoList, isLoading, addItem, deleteItem, changeItem}) => {
  return (
    <div className={styles.app}>
      <h1>To-do list</h1>
      {isLoading ?
        <div className={styles.spinner}></div>
        :
        <ul className={styles['todo-list']}>
          {
            todoList.map(listItem => (
              <li className={styles['todo-list__item']} key={listItem.id}>
                <span>{listItem.title}</span>
                <div className={styles.button__container}>
                  <button
                    type="button"
                    className={`${styles.button} ${styles['button--change']}`}
                    onClick={() => changeItem(listItem.id)}
                    disabled={isLoading}
                  >Изменить</button>

                  <button
                    type="button"
                    className={`${styles.button} ${styles['button--delete']}`}
                    onClick={() => deleteItem(listItem.id)}
                    disabled={isLoading}
                  >Удалить</button>
                </div>
              </li>
            ))
          }
        </ul>
      }
      <button
        type="button"
        className={styles.button}
        onClick={addItem}
        disabled={isLoading}
      >Add a to-do item</button>
    </div>
  )
};

const ENDPOINT = 'http://localhost:3004/todos';

export const AppContainer = () => {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(false);

  useGetItems(ENDPOINT, setTodoList, refreshFlag, setIsLoading);

  const addItem = useAddItem(ENDPOINT, setIsLoading, () => setRefreshFlag(!refreshFlag));

  const changeItem = useChangeItem(ENDPOINT, setIsLoading, () => setRefreshFlag(!refreshFlag));

  const deleteItem = useDeleteItem(ENDPOINT, setIsLoading, () => setRefreshFlag(!refreshFlag));

  // const deleteItem = (id) => {
  //     fetch(
  //       `${ENDPOINT}/${id}`,
  //       { method: 'DELETE' }
  //     )
  //       .then((rawJson) => rawJson.json())
  //       .then((response) => {
  //           console.log('response on delete', response);

  //           setRefreshFlag(!refreshFlag);
  //       })
  //       .catch(error => {
  //         console.log(error);
  //         setIsLoading(false);
  //       })
  // };

  return <AppLayout
    todoList={todoList}
    isLoading={isLoading}
    addItem={addItem}
    changeItem={changeItem}
    deleteItem={deleteItem}
  />;
};
