import './index.less'
export default function Header()
{
    const token=['Program King']
    return <div className="header">
            <div className="track-search-container">
                <form>
                    <input type="text" placeholder="Search..."/>
                    <button>
                        <i className="fas search fa-search"></i>
                    </button>
                </form>
            </div>
            <div className="user-details-container">
                <img alt="user" className="user-image" src=""/>
                <p className="user-name">{token[0]}</p>
            </div>
        </div>
}