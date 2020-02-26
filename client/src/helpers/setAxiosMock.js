export default function setAxiosMocks(
  axios, id = 'd87', cat_url = 'test_url', breed = 'Shorthair',
  breeds = [
    { name: 'Shorthair', id: 'shor' },
    { name: 'Other', id: 'othe' },
    { name: 'Longhaired', id: 'long' },
  ],
) {
  const imagePromise = Promise.resolve({
    data: [
      {
        breeds: [{ name: breed }],
        id,
        url: cat_url,
      },
    ],
  });
  const breedsPromise = Promise.resolve({ data: breeds });

  axios.get.mockImplementation((url) => {
    if (url.startsWith('https://api.thecatapi.com/v1/images/search')) {
      return imagePromise;
    }
    if (url.startsWith('https://api.thecatapi.com/v1/breeds')) {
      return breedsPromise;
    }
    return Promise.resolve({});
  });

  return { imagePromise, breedsPromise };
}
