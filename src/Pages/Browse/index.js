import './index.less'
export default function Browse() {
  const headers=['GENRES','NEW RELEASES','FEATURED']
  return <>
  <div className="section-title">
    <div>
      <h3 className="header-title">Browse</h3>
      <div className='browse-headers'>
          {
            headers.map((item,index)=>{
              return <p key={index}>{item}</p>
            })
          }
      </div>
    </div>
  </div>
  </>
}
