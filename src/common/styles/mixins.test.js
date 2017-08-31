import { placeholder } from './mixins';

it('creates all placeholder properties', () => {
  const conf = {color: 'red'};
  expect(placeholder(conf))
    .toEqual({
      '&::-webkit-input-placeholder': conf,
      '&:-moz-placeholder': conf,
      '&::-moz-placeholder': conf,
    });
});
