import { useEffect } from 'react';

export const useGetItems = (endpoint, setTodoList, refreshFlag, setIsLoading) => {
  useEffect(() => {
    setIsLoading && setIsLoading(true);

    fetch(endpoint)
      .then((loadedData) => loadedData.json())

      .then((list) => setTodoList(list))

      .finally(() =>  setIsLoading && setIsLoading(false));

  }, [refreshFlag]);
}
