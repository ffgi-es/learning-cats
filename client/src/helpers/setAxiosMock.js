export default function setAxiosMocks(
  axios,
  cats = [{ id: 'd87', url: 'test_url', breeds: [{ name: 'Shorthair' }] }],
  breeds = [
    { name: 'Shorthair', id: 'shor' },
    { name: 'Other', id: 'othe' },
    { name: 'Longhaired', id: 'long' },
  ],
) {
  const imagePromise = Promise.resolve({
    data: [cats.pop()],
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
