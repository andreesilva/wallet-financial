import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'marcos@gamil.com',
    required: true,
  })
  email: string;
  @ApiProperty({
    example: 'xxxxxxxxxx',
    required: true,
  })
  password: string;
}
