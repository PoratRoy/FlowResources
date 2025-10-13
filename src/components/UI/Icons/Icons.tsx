import React from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/outline';
import { ListBulletIcon } from '@heroicons/react/24/outline';
import { Squares2X2Icon } from '@heroicons/react/24/outline';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { PlusIcon } from '@heroicons/react/24/outline';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { QueueListIcon } from '@heroicons/react/24/outline';
import './Icons.css';

interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
  color?: string;
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
}

const IconWrapper: React.FC<IconProps & { IconComponent: React.ComponentType<any> }> = ({
  IconComponent,
  size = 24,
  className = '',
  style,
  color,
  stroke,
  strokeWidth,
  fill,
  ...props
}) => {
  const svgProps: any = {};
  if (color) svgProps.color = color;
  if (stroke) svgProps.stroke = stroke;
  if (strokeWidth) svgProps.strokeWidth = strokeWidth;
  if (fill) svgProps.fill = fill;

  return (
    <div
      className={`icon-wrapper ${className}`}
      style={{
        width: size,
        height: size,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
      {...props}
    >
      <IconComponent width={size} height={size} {...svgProps} />
    </div>
  );
};

export const Icon = {
  grid: (props: IconProps) => <IconWrapper IconComponent={Squares2X2Icon} {...props} />,
  list: (props: IconProps) => <IconWrapper IconComponent={ListBulletIcon} {...props} />,
  delete: (props: IconProps) => <IconWrapper IconComponent={TrashIcon} {...props} />,
  link: (props: IconProps) => <IconWrapper IconComponent={ArrowTopRightOnSquareIcon} {...props} />,
  star: (props: IconProps) => <IconWrapper IconComponent={StarIcon} {...props} />,
  close: (props: IconProps) => <IconWrapper IconComponent={XMarkIcon} {...props} />,
  dotsVertical: (props: IconProps) => <IconWrapper IconComponent={EllipsisVerticalIcon} {...props} />,
  dotsHorizontal: (props: IconProps) => <IconWrapper IconComponent={EllipsisHorizontalIcon} {...props} />,
  search: (props: IconProps) => <IconWrapper IconComponent={MagnifyingGlassIcon} {...props} />,
  add: (props: IconProps) => <IconWrapper IconComponent={PlusIcon} {...props} />,
  add2: (props: IconProps) => <IconWrapper IconComponent={PlusCircleIcon} {...props} />,
  reorder: (props: IconProps) => <IconWrapper IconComponent={QueueListIcon} {...props} />,
  edit: (props: IconProps) => <IconWrapper IconComponent={PencilSquareIcon} {...props} />,
};

export type { IconProps };
