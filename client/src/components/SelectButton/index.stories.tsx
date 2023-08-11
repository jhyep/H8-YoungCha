import type { Meta, StoryObj } from '@storybook/react';
import SelectButton from './index';
import * as Icon from '@/assets/icons';

const meta: Meta<typeof SelectButton> = {
  component: SelectButton,
};

export default meta;

type Story = StoryObj<typeof SelectButton>;

export const Default: Story = {
  render: () => (
    <>
      <SelectButton type="active">시스템</SelectButton>
      <br />
      <SelectButton type="default">시스템</SelectButton>
    </>
  ),
};

export const Size: Story = {
  render: () => (
    <>
      <SelectButton type="IconActive" size="md">
        <span>이름 입력</span>
        <Icon.CheckActive />
      </SelectButton>
      <br />
      <SelectButton type="default" size="md">
        <span>이름 입력</span>
        <Icon.CheckInactive />
      </SelectButton>
      <br />
      <br />
      <SelectButton type="IconActive" size="lg">
        <span>연령이나 성별 입력</span>
        <Icon.CheckActive />
      </SelectButton>
      <br />
      <SelectButton type="default" size="lg">
        <span>연령이나 성별 입력</span>
        <Icon.CheckInactive />
      </SelectButton>
    </>
  ),
};
