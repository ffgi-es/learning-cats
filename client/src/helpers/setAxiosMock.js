export default function setAxiosMocks(
  axios, id = 'd87', cat_url = 'test_url', breed = 'Shorthair',
  breeds = [
    { name: 'Shorthair', id: 'shor' },
    { name: 'Other', id: 'othe' },
    { name: 'Longhaired', id: 'long' },
  ],
) {
  axios.get.mockImplementation((url) => {
    if (url.startsWith('https://api.thecatapi.com/v1/images/search')) {
      return Promise.resolve({
        data: [
          {
            breeds: [{ name: breed }],
            id,
            url: cat_url,
          },
        ],
      });
    }
    if (url.startsWith('https://api.thecatapi.com/v1/breeds')) {
      return Promise.resolve({ data: breeds });
    }
    return Promise.resolve({});
  });
}
