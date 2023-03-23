import { SetMetadata } from '@nestjs/common';

export const RtPublic = () => SetMetadata('isPublic', true);
