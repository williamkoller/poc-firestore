import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AddProductDto } from '../dtos/add-product.dto';
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
}
