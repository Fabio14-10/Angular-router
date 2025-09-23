import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { retry, catchError, map, tap } from 'rxjs/operators';
import { throwError, zip, Observable } from 'rxjs';

import { Product, CreateProductDTO, UpdateProductDTO } from './../models/product.model';
import { checkTime } from './../interceptors/time.interceptor';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  // Cambié la base para evitar duplicar "/products" al concatenar más abajo.
  private apiUrl = `${environment.API_URL}/api`;

  constructor(
    private http: HttpClient
  ) { }

  getByCategory(categoryId: string, limit?: number, offset?: number): Observable<Product[]> {
    let params = new HttpParams();
    if (limit != null) {
      params = params.set('limit', String(limit));
    }
    if (offset != null) {
      params = params.set('offset', String(offset));
    }
    // Endpoint: /api/categories/:id/products
    return this.http.get<Product[]>(`${this.apiUrl}/categories/${categoryId}/products`, { params });
  }

  getAll(limit?: number, offset?: number): Observable<Product[]> {
    let params = new HttpParams();
    if (limit != null) {
      params = params.set('limit', String(limit));
    }
    if (offset != null) {
      params = params.set('offset', String(offset));
    }
    return this.http.get<Product[]>(`${this.apiUrl}/products`, { params, context: checkTime() })
    .pipe(
      retry(3),
      // tap(data => console.log('getAll - productos recibidos:', data)), // <- descomenta para debug
      map(products => products.map(item => ({
        ...item,
        taxes: 0.19 * item.price
      })))
    );
  }

  fetchReadAndUpdate(id: string, dto: UpdateProductDTO) {
    return zip(
      this.getOne(id),
      this.update(id, dto)
    );
  }

  getOne(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Conflict) {
          return throwError(() => new Error('Algo esta fallando en el server'));
        }
        if (error.status === HttpStatusCode.NotFound) {
          return throwError(() => new Error('El producto no existe'));
        }
        if (error.status === HttpStatusCode.Unauthorized) {
          return throwError(() => new Error('No estas permitido'));
        }
        return throwError(() => new Error('Ups algo salio mal'));
      })
    );
  }

  create(dto: CreateProductDTO): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/products`, dto);
  }

  update(id: string, dto: UpdateProductDTO): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/products/${id}`, dto);
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/products/${id}`);
  }
}

