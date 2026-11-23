import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ApodItem, post } from './home/post';
import { Subject } from 'rxjs';
import { environment } from '../environments/environment';

const FEED_SIZE = 10;

@Injectable({
  providedIn: 'root',
})
export class NasaService {
  private nasaDataListener = new Subject<Array<post>>();

  constructor(private http: HttpClient) {}

  getNasaData() {
    this.http
      .get<Array<ApodItem>>(environment.APOD_API_URL, {
        params: { per_page: FEED_SIZE },
      })
      .pipe(map((items) => items.map(toPost)))
      .subscribe({
        next: (data) => this.nasaDataListener.next(data),
        error: (err) => this.handleError(err),
      });
  }

  getData() {
    return this.nasaDataListener.asObservable();
  }

  /** APOD entry for a single date (YYYY-MM-DD). */
  getNasaDateData(date: string) {
    const id = toApodId(date);
    if (!id) {
      alert('Select a valid Date');
      this.nasaDataListener.next([]);
      return;
    }
    this.http
      .get<ApodItem>(`${environment.APOD_API_URL}/${id}`)
      .pipe(map((item) => [toPost(item)]))
      .subscribe({
        next: (data) => this.nasaDataListener.next(data),
        error: (err) => this.handleError(err),
      });
  }

  private handleError(err: HttpErrorResponse) {
    console.error(err);
    alert(
      err.status === 404
        ? 'No Astronomy Picture of the Day exists for that date.'
        : 'Could not load pictures from NASA. Please try again later.',
    );
    this.nasaDataListener.next([]);
  }
}

function toApodId(date: string): string | null {
  const match = /^\d{2}(\d{2})-(\d{2})-(\d{2})$/.exec(date);
  return match ? match[1] + match[2] + match[3] : null;
}

function toPost(item: ApodItem): post {
  return {
    date: item.date,
    title: item.title,
    imageUrl: item.hdurl,
    articleUrl: item.permalink || item.url,
    mediaType: item.media_type,
    alt: item.alt || item.title,
    explanation: (item.explanation ?? '').replace(
      /^\s*<strong>\s*Explanation:\s*<\/strong>\s*/i,
      '',
    ),
    credit: item.copyright ?? '',
    liked: false,
  };
}
