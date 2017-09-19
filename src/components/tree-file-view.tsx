import * as React from 'react';
import { List, Icon } from 'semantic-ui-react';
import { GithubSourceContent } from './github-source-content';
import './tree-file-view.scss';

type Item = {
    path: string;
    children?: Item[];
}

type TreeFileViewProps = {
    root?: string;
    items: Item[];
};


function append( path: string, add?: string ): string {
    return `${path.endsWith( '/' ) ? path : path + '/'}${!add ? '' : add}`;
}

const ItemRenderer: React.SFC<{ item: Item; path: string; onClick: ( path?: string ) => void; selected?: string; }> = props => {
    const currentPath = append( props.path, props.item.path );
    return (
        <List.Item>
            <List.Header as='a' onClick={ () => { if( !props.item.children ) props.onClick( currentPath ); } }>
                { <Icon name={ !!props.item.children ? 'folder' : 'file' }/> }
                { props.item.path }
            </List.Header>
            { !props.item.children ? null : (
                <List.List>
                    { props.item.children.map( item => <ItemRenderer key={ `${currentPath}/${item.path}` }
                                                                     item={ item }
                                                                     path={ currentPath }
                                                                     onClick={ props.onClick }
                                                                     selected={ props.selected }/> ) }
                </List.List>
            ) }
        </List.Item>
    );
};


const explore = ( items: Item[] | undefined, path: string ): string => {
    if( !items || items.length === 0 ) return path;
    return explore( items[ 0 ].children, append( path, items[ 0 ].path ) );
};

class TreeFileView extends React.Component<TreeFileViewProps> {
    state: { selected?: string } = {};
    
    onClick = ( selected?: string ) => { this.setState( { selected } ); };
    
    init( props: TreeFileViewProps ) {
        const selected = explore( props.items, props.root || '' );
        if( selected === '' || selected === props.root ) return;
        this.setState( { selected } );
    }
    
    componentDidMount(): void {
        this.init( this.props );
    }
    
    componentWillReceiveProps( nextProps: Readonly<TreeFileViewProps>, nextContext: any ): void {
        this.init( nextProps );
    }
    
    get root(): string {
        return !this.props.root ? '' : append( this.props.root );
    }
    
    render(): JSX.Element | any {
        return (
            <div className="tree-file-view">
                <List floated="left">
                    {
                        this.props.items.map( item => <ItemRenderer key={ `${this.root}/${item.path}` }
                                                                    path={ this.root }
                                                                    item={ item }
                                                                    onClick={ this.onClick }
                                                                    selected={ this.state.selected }/> )
                    }
                </List>
                <div className="content">
                    { this.state.selected ? <GithubSourceContent file={ this.state.selected }/> : null }
                </div>
            </div>
        );
    }
}

export { Item, TreeFileViewProps, TreeFileView };
