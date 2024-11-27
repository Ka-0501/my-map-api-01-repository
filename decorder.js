/* class PolylineDecoder {
    // エンコードされたポリラインをデコードし、緯度・経度の座標を返す関数
    static decode(encoded) {
      let index = 0;
      const len = encoded.length;
      const path = [];
      let lat = 0;
      let lng = 0;
  
      while (index < len) {
        let result = 1;
        let shift = 0;
        let b;
        do {
          b = encoded.charCodeAt(index++) - 63 - 1;
          result += b << shift;
          shift += 5;
        } while (b >= 0x1f);
        lat += (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
  
        result = 1;
        shift = 0;
        do {
          b = encoded.charCodeAt(index++) - 63 - 1;
          result += b << shift;
          shift += 5;
        } while (b >= 0x1f);
        lng += (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
  
        // 緯度・経度を座標として配列に追加
        path.push([lat * 1e-5, lng * 1e-5]);
      }
  
      return path;
    }
  }
  
  // 使用例
  const encodedPolyline = '{z{xEaonrYx@?dADXBXFpAf@~CtA`A`@vABfADlALlCh@dBZrE~@z@XHDlAp@fAr@pC~AHFZP~BdAjAt@r@r@hDhDxA~AnEtEf@l@h@t@`@n@v@dBt@hB`@x@\\d@VZ`@`@nClB';
  
  // デコードして座標の配列を取得
  const decodedPath = PolylineDecoder.decode(encodedPolyline);
  
  console.log('Decoded Path with 6 decimals:', JSON.stringify(decodedPath, null, 2));
   */