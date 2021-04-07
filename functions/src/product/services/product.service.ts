import { Injectable } from '@nestjs/common';
import { database, productCollection } from '../database/product.database';
import { AddProductDto } from '../dtos/add-product.dto';
import { Product } from '../interface/product.interface';

@Injectable()
export class ProductService {
  async add(addProductDto: AddProductDto): Promise<any> {
    const product: Product = {
      id: addProductDto.id,
      name: addProductDto.name,
      description: addProductDto.description,
    };
    const result = await database.collection(productCollection).add(product);
    return result;
  }
}