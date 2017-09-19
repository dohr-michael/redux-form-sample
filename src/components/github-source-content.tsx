import * as React from 'react';
import { Observable } from 'rxjs';
import { Loader, Dimmer } from 'semantic-ui-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { idea } from 'react-syntax-highlighter/dist/styles';


type GithubSourceContentProps = {
    user?: string;
    project?: string;
    branch?: string;
    file: string;
};

class GithubSourceContent extends React.Component<GithubSourceContentProps> {
    static defaultProps = {
        user:    'dohr-michael',
        branch:  'master',
        project: 'redux-form-sample',
    };
    
    state: { raw?: string } = {};
    mounted: boolean = false;
    
    loadRaw( props: GithubSourceContentProps ) {
        Observable.ajax.get(
            `https://api.github.com/repos/${props.user}/${props.project}/contents/${props.file}`, {
                Accept: 'application/vnd.github.v3+json'
            }
        ).forEach( res => {
            if( this.mounted ) this.setState( { raw: atob( res.response.content ) } );
        } );
    }
    
    componentDidMount(): void {
        this.mounted = true;
        this.loadRaw( this.props );
    }
    
    componentWillReceiveProps( nextProps: Readonly<GithubSourceContentProps>, nextContext: any ): void { this.loadRaw( nextProps ); }
    
    componentWillUnmount(): void { this.mounted = false; }
    
    render(): JSX.Element | any {
        const { raw } = this.state;
        return (
            <Dimmer.Dimmable dimmed={ !raw }>
                <Dimmer active={ !raw } inverted>
                    <Loader>Loading</Loader>
                </Dimmer>
                { raw ? <SyntaxHighlighter style={ idea } language="react">
                    { raw }
                </SyntaxHighlighter> : null }
            </Dimmer.Dimmable>
        );
    }
}

export { GithubSourceContentProps, GithubSourceContent };
