import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AddProductDto } from '../dtos/add-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { ProductService } from '../services/product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async add(@Body() addProductDto: AddProductDto): Promise<any> {
    try {
      return await this.productService.add(addProductDto);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<any> {
    return await this.productService.update(id, updateProductDto);
  }
}
