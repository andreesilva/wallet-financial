import { ApiProperty } from '@nestjs/swagger';

export class CreatePartnerDto {
  @ApiProperty({
    example: 'Marcos Lima da Silva',
    required: true,
  })
  name: string;
}
