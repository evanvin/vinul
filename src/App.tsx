import axios from 'axios';
import React from 'react';

import fallback from './NO_IMAGE.jpg';
import { test_data } from './local_input';

// const BASE_URL = 'https://clovereartquakedog.pythonanywhere.com/vinul/v1';
const BASE_URL = 'http://127.0.0.1:5000/vinul/v1';

class App extends React.Component {
  state = { vinyls: [], isLoading: true };

  async componentDidMount() {
    this.setState({ isLoading: true });
    // TDOO: uncomment when ready for prod
    // const list = await axios.get(`${BASE_URL}/collection`);
    // this.setState({ vinyls: list.data, isLoading: false });

    let vinyls = test_data.filter((v) =>
      ['Shellac', 'Vinyl'].includes(
        v['basic_information']['formats'][0]['name']
      )
    );
    this.setState({ vinyls, isLoading: false });
  }

  render() {
    const { isLoading, vinyls } = this.state;
    return (
      <>
        {isLoading ? (
          'SpinningOverlay'
        ) : (
          <>
            <div className='flex flex-col mx-auto py-6 px-4 max-h-screen overflow-y-auto'>
              <div className='flex flex-row justify-center'>
                <div className='basis-full text-center prose prose-headings:font-serif'>
                  <h1>vinül</h1>
                </div>
              </div>
              <div className='flex flex-row'>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-4 gap-4 mx-auto py-6 px-4 overflow-y-auto'>
                  {vinyls.map((v, idx) => {
                    return (
                      <ImageWithFallback
                        src={v['basic_information']['cover_image']}
                        alt={`${v['basic_information']['title']}`}
                        k={`carousel-item-img-${idx}`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}
      </>
    );
  }
}

export default App;

function ImageWithFallback(props: any) {
  const { src, alt, k } = props;

  return (
    <img
      src={src}
      alt={alt}
      key={k}
      // style={{ height: '400px', aspectRatio: '1 / 1', objectFit: 'cover' }}
      onError={(e) => (e.currentTarget.src = fallback)}
      className='album-img rounded-box'
    />
  );
}
