import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountDto {
  @ApiProperty({
    example: 100,
    required: true,
  })
  balance: number;
}
