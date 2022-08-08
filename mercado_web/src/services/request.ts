import https from 'https';
import http from 'http';

const request = <T>(options: https.RequestOptions): Promise<T> => {
  return new Promise((resolve, reject) => {
    if (options.path?.includes(' ')) {
      options.path = options.path.replace(/ /g, '%20')
    }
    const req = http.request(options, res => {
      let json = '';
      res.on('data', d => {
        json += d;
      });
      res.on('end', () => {
        
        resolve(JSON.parse(json) as T)
      })
    });
    req.on('error', error => {
      console.error(error);
      reject(error);
    });
    req.end();
  });
}
export default request;
