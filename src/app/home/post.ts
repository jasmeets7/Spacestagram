export interface ApodItem {
  date: string;
  title: string;
  url: string;
  permalink: string;
  hdurl: string;
  media_type: string;
  explanation: string;
  alt?: string;
  copyright?: string;
}

export interface post {
  date: string;
  title: string;
  imageUrl: string;
  articleUrl: string;
  mediaType: string;
  alt: string;
  explanation: string;
  credit: string;
  liked: boolean;
}
