// json-server --watch src/db.json --port 3004 --delay 1000

// 2. Переделать приложение, заменив JSON Placeholder на JSON Server:

// DONE!!! начальный список дел отсутствует (пустой массив);

// DONE!!! реализовать CRUD-операции, добавить возможность добавления, изменения и удаления дела;

// DONE!!! реализовать поиск дел по заданной фразе (для нахождения элемента в тексте дела должен быть совпадающий с введенной фразой фрагмент);

// DONE!!! реализовать кнопку для включения режима сортировки дел по алфавиту, если кнопка не нажата — изначальная сортировка (т. е. отсутствие сортировки).

// DONE!!! Дополнительно. Реализовать продвинутый поиск с помощью debounce().

import { useState } from 'react';
import styles from './app.module.css';
import {
  useGetItems,
  useAddItem,
  useChangeItem,
  useDeleteItem,
  useDebounce,
} from './hooks/index';

const AppLayout = ({
  todoList,
  isLoading,
  addItem,
  deleteItem,
  changeItem,
  toggleSort,
  sort,
  query,
  setQuery,
}) => {
  return (
    <div className={styles.app}>
      <h1>To-do list</h1>

      <input
        type="text"
        placeholder="Type to search..."
        value={query}
        className={styles.input}
        onChange={({target}) => setQuery(target.value)}
      />

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
                  >Change</button>

                  <button
                    type="button"
                    className={`${styles.button} ${styles['button--delete']}`}
                    onClick={() => deleteItem(listItem.id)}
                    disabled={isLoading}
                  >Delete</button>
                </div>
              </li>
            ))
          }
        </ul>
      }

      <div className={styles.button__container}>
        <button
          type="button"
          className={styles.button}
          onClick={addItem}
          disabled={isLoading}
        >Add a to-do item</button>

        <button
          type="button"
          className={styles.button}
          onClick={toggleSort}
          disabled={isLoading}
        >
          {sort === '' ? 'Sort items' : 'Turn sorting off'}
        </button>
      </div>

    </div>
  )
};

const ENDPOINT = 'http://localhost:3004/todos';

export const AppContainer = () => {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [sort, setSort] = useState('');
  const [query, setQuery] = useState('');

  const debouncedQuery = useDebounce(query, 300, () => setRefreshFlag(!refreshFlag)); // 300ms delay

  const currentEndpoint = `${ENDPOINT}?q=${debouncedQuery}&_sort=${sort}`;

  useGetItems(currentEndpoint, setTodoList, refreshFlag, setIsLoading);

  const addItem = useAddItem(currentEndpoint, setIsLoading, () => {
    setRefreshFlag(!refreshFlag);
    setQuery('');
  });

  const changeItem = useChangeItem(ENDPOINT, setIsLoading, () => setRefreshFlag(!refreshFlag));

  const deleteItem = useDeleteItem(ENDPOINT, setIsLoading, () => setRefreshFlag(!refreshFlag));

  const toggleSort = () => {
    setSort(prevValue => prevValue === '' ? 'title' : '');
    setRefreshFlag(!refreshFlag);
  }

  return <AppLayout
    todoList={todoList}
    isLoading={isLoading}
    addItem={addItem}
    changeItem={changeItem}
    deleteItem={deleteItem}
    query={query}
    setQuery={setQuery}
    sort={sort}
    toggleSort={toggleSort}
  />;
};
