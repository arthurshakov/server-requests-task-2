export const useSearchItem = (endpoint, setIsLoading, setTodoList) => {
  return () => {
    const query = prompt('Enter what you want to search for ?');

    if (query) {
      setIsLoading && setIsLoading(true);

      console.log(`${endpoint}?title_like=${query}`);

      fetch(`${endpoint}?q=${query}`)
        .then((rawJson) => rawJson.json())
        .then((foundItems) => {
            console.log('found items', foundItems);

            setTodoList(foundItems);
        })
        .catch(error => console.log(error))
        .finally(() => setIsLoading && setIsLoading(false))
    }
  }
};
