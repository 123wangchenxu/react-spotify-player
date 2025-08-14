import './index.less'
export default function Header()
{
    const token=['Program King']
    return <div class="header">
            <div class="track-search-container">
                <form>
                    <input type="text" placeholder="Search..."/>
                    <button>
                        <i class="fas search fa-search"></i>
                    </button>
                </form>
            </div>
            <div class="user-details-container">
                <img alt="user" class="user-image" src=""/>
                <p class="user-name">{token[0]}</p>
            </div>
        </div>
}