import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumb } from "../../../../components/Breadcrumb/Breadcrumb";
import {
  searchResultsHelpCenter,
} from "../../../../constants/HelpCenter.constant";
import { getImageOfAssets } from "../../../../helpers/getImages";
import HeaderApp from "../../../../shared/HeaderApp/HeaderApp";
import { Tabs } from "../../../../components/Tabs/Tabs";
import { useContainerHeigh } from "../../../../hooks/contentHeight";
import "./SearchResults.scss";
import { searchHelpCenterDashboard } from "../../../../constants/DashboardHelpCenter.constant";
import { Search } from "../../../../components/Search/Search";
import { Accordion } from "../../../../components/Accordion/Accordion";
import { accordionFormat } from "../../../../helpers/accordionFormat";
import { CardItem } from "../../../../components/Card/CardItem";
import FooterApp from "../../../../shared/FooterApp/FooterApp";
import { useHistory } from "react-router";
import { postSearchHelpCenterService } from "../../../../middlewares/helpCenterMiddlewares/searchHelpMiddleware/searchHelpMiddleware";
import ScreenError from "../../../../shared/ScreenError/ScreenError";
import { typesRequestErrors } from "../../../../constants/error.constant";

const typesTabs = {
  questions: 'questions',
  tickets: 'tickets'
}

const tabFaqs =  {
  icon: "",
  title: "Preguntas frecuentes",
  id: "questions",
  disabled: false,
};

const tabTickets = {
  icon: "",
  title: "Tickets",
  id: "tickets",
  disabled: false,
};

const SearchResults = () => {
  const { height } = useContainerHeigh(0);
  const history = useHistory();
  const dispatch = useDispatch();

  const { texts } = useSelector((state) => state.texts);
  const [desktop, setDesktop] = useState(window.innerWidth > 991);
  const {search,errors} = useSelector((state) => state.helpCenterFaqs);
  const [data,setData] = useState({
    tickets: null,
    faqs: null
  })
  const [phrase,setPhrase] = useState('');

  const [select, setSelect] = useState(
    ''
  );

  const [emptyResults,setEmptyResults] = useState(false);

  const [tabs,setTabs] = useState({
    ...searchResultsHelpCenter.tabs,
  })

  const background = {
    backgroundImage: `url(${getImageOfAssets(
      texts?.helpCenter.images.headerHelpCenter
    )})`,
    backgroundSize: "cover",
    minHeight: "247px",
  };

  useEffect(() => {
    window.scrollTo(0,0);
    const search = history.location.search;
    const query = search.replace('?','');
    if(query.includes('search=')) {
      const phraseValue = query.replace('search=','').split('%').join(' ');
      dispatch(postSearchHelpCenterService(phraseValue));
      setPhrase(phraseValue);
    }
    else {
      history.push('/help-center/dashboard')
    }
    

  }, [history.location.search]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {

    setData({
      tickets: search.tickets,
      faqs: search.faqs
    })

    if(search.tickets && search.faqs) {
      setEmptyResults(false);
      setTabs((tabs) => {
        return {
          ...tabs,
          items: [tabFaqs,tabTickets],
          focus: tabFaqs.id
        }
      })
      setSelect(typesTabs.questions)
    }
    else if(search.tickets === null && search.faqs){
      setEmptyResults(false);
      setTabs((tabs) => {
        return {
          ...tabs,
          items: [tabFaqs],
          focus: tabFaqs.id
        }
      })
      setSelect(typesTabs.questions)
    }
    else if(search.faqs === null && search.tickets){
      setEmptyResults(false);
      setTabs((tabs) => {
        return {
          ...tabs,
          items: [tabTickets],
          focus: tabTickets.id
        }
      })
      setSelect(typesTabs.tickets)
    }
    else {
      setEmptyResults(true);
    }

  },[search]);


  const handleWithResults = () => {
    return (
      <>
         <div className="tabssearchresults">
            <Tabs 
              data={tabs} 
              onTap={(e) => {
                setSelect(e.detail)
              }}
            />
          </div>
          <div className="selectsearchresults">
            {select === typesTabs.questions ? (
              <Accordion
                data={data.faqs ? accordionFormat(data.faqs):[]}
              />
            ) : ''}
            {
              select === typesTabs.tickets ? (
                <>
                  {data.tickets ? data.tickets.map((content, i) => {
                    return (
                      <div className="cardsearchresults" key={'divticket'+i}>
                        <CardItem
                          key={i+'tickets'}
                          data={content}
                          onIcon={() => {
                            history.push(content.path);
                          }}
                        />
                      </div>
                    );
                  }):null}
                </>
              ):''
            }
          </div>
      </>
    )
  }

  const handleScreen = (msg) => {
    return (
      <ScreenError
        msg={msg}
      />
    )
  }


  return (
    <>
      <HeaderApp />
      <div className="searchresults-container " style={{ minHeight: `calc(${height}px - 77px)` }}>
        <div className="headsearchresults" style={desktop ? background : {}}>
          <div className="breadcrumbsearchresults">
            <Breadcrumb
              data={searchResultsHelpCenter.breadCrumb}
              onItem={(e) => {
                history.push(e.detail);
              }}
              onBack={(e) => {
                history.push("/");
              }}
            />
          </div>
          <div className="titlesearchresults">
            {searchResultsHelpCenter.title}
          </div>
          <div className="inputsearchresults">
            <Search 
              data={{...searchHelpCenterDashboard,size: 'large'}}
              value={phrase}
              onEnter={(e) => {
                const search = e.detail.value.split(' ').join('%');
                history.replace('/help-center/search-results?search='+search);
              }}
            />
          </div>
        </div>
        <div className="contentsearchresults">
          {
            errors[typesRequestErrors.getSearchHelp].isError ? 
            handleScreen(texts?.helpCenter?.searchResults?.error):(
              emptyResults ?  
              handleScreen(texts?.helpCenter?.searchResults?.empty):
              handleWithResults()
            )
          }
        </div>
      </div>
      <FooterApp />
    </>
  );
};

export default SearchResults;
