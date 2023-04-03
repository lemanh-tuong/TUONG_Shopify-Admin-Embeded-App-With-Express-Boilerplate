import { ComponentStory, Meta } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';
import { AsyncComponent } from './AsyncComponent';

export default {
  title: 'AsyncComponent',
  component: AsyncComponent,
  argTypes: {
    status: {
      control: 'select',
      options: ['idle', 'loading', 'success', 'failure'],
    },
    isEmpty: {
      control: 'boolean',
    },
  },
  args: {
    status: 'idle',
    isEmpty: false,
    Idle: <h1>Idle</h1>,
    Success: <h1>Success</h1>,
    Failure: <h1>Failure</h1>,
    Empty: <h1>Empty</h1>,
  },
  decorators: [withDesign],
} as Meta<typeof AsyncComponent>;

export const Default: ComponentStory<typeof AsyncComponent> = args => {
  return <AsyncComponent {...args} />;
};

Default.parameters = {
  type: 'figma',
  url: 'https://www.figma.com/file/LKQ4FJ4bTnCSjedbRpk931/Sample-File',
};
