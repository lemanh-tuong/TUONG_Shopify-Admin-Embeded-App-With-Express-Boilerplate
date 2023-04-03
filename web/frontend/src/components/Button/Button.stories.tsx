import { ComponentStory, ComponentMeta } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';
import { Button } from './Button';

export default {
  title: 'Button',
  component: Button,
  decorators: [withDesign],
  argTypes: {},
  args: {
    children: 'Lorem ipsum carrots enhanced rebates',
  },
} as ComponentMeta<typeof Button>;

export const Default: ComponentStory<typeof Button> = args => <Button {...args} />;

Default.parameters = {
  type: 'figma',
  url: 'https://www.figma.com/file/LKQ4FJ4bTnCSjedbRpk931/Sample-File',
};
