import './index.less'
import useStore from '../../store/user'
export default function Header()
{
    const {nickname,pic,token,setNickName,setPic,setToken}=useStore()
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
                <img alt="user" className="user-image" src={pic}/>
                <p className="user-name">{nickname}</p>
            </div>
        </div>
}