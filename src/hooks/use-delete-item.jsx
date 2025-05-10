export const useDeleteItem = (endpoint, setIsLoading, callback) => {
  return (id) => {
    fetch(
      `${endpoint}/${id}`,
      { method: 'DELETE' }
    )
      .then((rawJson) => rawJson.json())
      .then((response) => {
          console.log('response on delete', response);

          callback && callback();
      })
      .catch(error => {
        console.log(error);
        setIsLoading && setIsLoading(false);
      })
  }
};
