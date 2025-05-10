export const useAddItem = (endpoint, setIsLoading, callback) => {
  return () => {
    const todoTitle = prompt('What would you like to add to your to-do list ?');

    if (todoTitle) {
      setIsLoading && setIsLoading(true);

      fetch(
        endpoint,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json;charset=utf-8' },
          body: JSON.stringify({title: todoTitle})
        }
      )
        .then((rawJson) => rawJson.json())
        .then((addedItem) => {
            console.log('addedItem', addedItem);

            // setRefreshFlag(!refreshFlag);
            callback && callback();
        })
        .catch(error => {
          console.log(error);
          setIsLoading && setIsLoading(false);
        })
    }
  }
};
