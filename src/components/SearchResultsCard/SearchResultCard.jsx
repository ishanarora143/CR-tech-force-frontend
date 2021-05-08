import {
  Badge,
  Button,
  Card,
  IconButton,
  makeStyles,
  Snackbar,
  Typography,
  withTheme,
} from "@material-ui/core";
import React, { useState } from "react";
import GreenTick from "../GreenTick/GreenTick";
import ThumbsUp from "../../global/assets/icons/thumsup.svg";
import ThumbsDown from "../../global/assets/icons/thumbsdown.svg";
import { gql, useMutation } from "@apollo/client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import resourceData from "../../utils/resources";
dayjs.extend(relativeTime);

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "1.5rem",
  },
  root: {
    minWidth: theme.spacing(37.25),
    border: "1px solid #F1F1F1",
    background: "linear-gradient(97.93deg, #4452CE 43.88%, #6744CC 109.61%)",
  },
  cardHeader: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(1.5, 2.75, 0.625),
    color: "#fff",
  },
  cardTitle: {
    lineHeight: "23.6px",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    background: "#fff",
    padding: theme.spacing(3, 4, 3.75, 3),
    color: "#8F8F8F",
    position: "relative",
  },
  cardFooter: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: theme.spacing(2, 3),
    color: "#fff",
  },
  thumbsUp: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    marginLeft: theme.spacing(5),
  },
  thumbsDown: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    marginLeft: theme.spacing(2.5),
  },
  badge: {
    marginTop: theme.spacing(-1),
    marginRight: theme.spacing(-1),
    color: "#000",
    backgroundColor: "#fff",
  },
}));

const UPVOTE_COUNT = gql`
  mutation($ticketId: String) {
    upvoteTicket(input: { ticketId: $ticketId }) {
      status
      message
    }
  }
`;

const DOWNVOTE_COUNT = gql`
  mutation($ticketId: String) {
    downvoteTicket(input: { ticketId: $ticketId }) {
      status
      message
    }
  }
`;

const SearchResultCard = (props) => {
  const classes = useStyles();
  let {
    title,
    lastVerified,
    phone,
    location,
    details,
    thumbsUpcount,
    theme,
    ticketId,
    resourceType,
    subResourceType,
    state,
    city,
    availability,
    costPerUnit,
  } = props;

  if (thumbsUpcount && !isNaN(thumbsUpcount)) {
    thumbsUpcount = parseInt(thumbsUpcount);
  } else {
    thumbsUpcount = 0;
  }

  const [upvote, setUpvote] = useState(thumbsUpcount);

  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const [allowUpvote, setAllowUpvote] = useState(true);
  const [allowDownvote, setAllowDownvote] = useState(true);

  const [expanded, setExpanded] = useState(false);

  const [upvoteTicket] = useMutation(UPVOTE_COUNT, {
    variables: {
      ticketId,
    },
    update(proxy, result) {
      if (
        result &&
        result.data &&
        result.data.upvoteTicket &&
        result.data.upvoteTicket.status === "200"
      ) {
        setUpvote(upvote + 1);
        setAllowDownvote(true);
        setAllowUpvote(false);
      } else {
        setDialogMessage("Please try again later.");
        setDialogOpen(true);
      }
    },
    onError(err) {
      setDialogMessage("Please try again later.");
      setDialogOpen(true);
    },
  });

  const [downvoteTicket] = useMutation(DOWNVOTE_COUNT, {
    variables: {
      ticketId,
    },
    update(proxy, result) {
      if (
        result &&
        result.data &&
        result.data.downvoteTicket &&
        result.data.downvoteTicket.status === "200"
      ) {
        setUpvote(upvote - 1);
        setAllowDownvote(false);
        setAllowUpvote(true);
      } else {
        setDialogMessage("Please try again later.");
        setDialogOpen(true);
      }
    },
    onError(err) {
      setDialogMessage("Please try again later.");
      setDialogOpen(true);
    },
  });

  const getInfoToCopy = () => {
    const lastVerifiedText = `Last Verified: ${getVerifiedText(lastVerified)}`;
    const phoneNumberText = `Phone Number - ${phone}`;
    const stateText = state ? `State - ${state}` : "";
    const cityText = city ? `City - ${city}` : "";
    const addressText = `Address - ${location}`;
    const detailsText = `Other details - ${details}`;
    const resourceLead = resourceType ? `${resourceType} lead information` : "";

    const copyText = `${resourceLead}
    ${title ? `${title} - ` : ""}
    ${lastVerified ? lastVerifiedText : ""}
    ${phone ? phoneNumberText : ""}
    ${stateText}
    ${cityText}
    ${location ? addressText : ""}
    ${details ? detailsText : ""}
    
    To find more such covid related information leads, visit: ${
      window.location.origin
    }`;

    return copyText;
  };

  const copyInfo = () => {
    const copyText = getInfoToCopy();

    navigator.clipboard.writeText(copyText);
    setDialogMessage("Information Copied to Clipboard");
    setDialogOpen(true);
  };

  const copyLink = () => {
    const copyText = getInfoToCopy();

    if (navigator.share) {
      navigator
        .share({
          title: `${resourceType} Lead`,
          text: copyText,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    }
  };

  const getVerifiedText = (lastVerified) => {
    if (!Number.isNaN(lastVerified)) {
      return dayjs(Number(lastVerified)).fromNow();
    }

    return dayjs(lastVerified).fromNow();
  };

  // fields to display in before more details
  const essentialFields = [{ name:'State',value:'state'},{ name:'Other Info',value:'details'}]

// fields to display afer click on more details
  const moreFields = [{name:'Location',value:'location'},{name:'Cost Per Unit',value:'costPerUnit'},{name:"Availability",value:'availability'}]

  //more details button will be only visibile if field value is present
  let more_details = false
  for(let i=0;i<moreFields.length;i++){
    if(props[moreFields[i].value]){
      more_details = true
      break;
    }
  }

  return (
    <div className={`${classes.container} ${props.className || ""}`}>
      <Card variant="outlined" className={classes.root}>
        <div className={classes.cardHeader}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "3px",
            }}
          >
            <div
              style={{
                height: "16px",
                width: "16px",
                borderRadius: "8px",
                background: "#fff",
                marginRight: "3px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                style={{ height: "80%", width: "80%" }}
                src={
                  resourceData.find(
                    (object) => object.resource === resourceType
                  )?.iconSrc
                }
                alt={resourceType}
              />
            </div>
            <Typography style={{ fontSize: "12px" }}>{resourceType}</Typography>
            <GreenTick className="ml-3" />
          </div>

          <div style={{ display: "flex", marginBottom: "4px" }}>
            <Typography style={{ fontSize: "18px" }}>
              {subResourceType}
            </Typography>
          </div>

          <div className="d-flex align-items-start mb-1">
            <div className="mr-3 flex-grow-1 d-flex align-items-start">
              <span style={{ opacity: 0.8 }} className="mr-2">
                Name:{" "}
              </span>
              <Typography>{title || "-"}</Typography>
            </div>
          </div>

          {city && (
            <div style={{ marginBottom: "2px" }} className="d-flex">
              <span style={{ opacity: 0.8 }} className="mr-3">
                City:
              </span>
              <Typography>{city}</Typography>
            </div>
          )}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Typography style={{ fontSize: "12px", opacity: 0.7 }}>
              Last Verified: {getVerifiedText(lastVerified)}
            </Typography>
          </div>
        </div>

        <div className={classes.cardContent}>
          <div className="d-flex">
            <div className="flex-grow-1 mr-3">
              <Typography variant="body2">Phone</Typography>
              <Typography variant="h6">
                <a href={`tel:${phone}`}>{phone}</a>
              </Typography>
            </div>
            <Button
              style={{ height: "fit-content" }}
              onClick={() => copyInfo()}
              color="primary"
              variant="outlined"
            >
              COPY
            </Button>
          </div>

          {
            essentialFields.map((el,key)=>
            props[el.value] && props[el.value]!="-"?
              <>
                <Typography
                style={{ marginTop: theme.spacing(2) }}
                variant="body2"
                    >
                      {el.name} 
                </Typography>
                <Typography variant="body1">{props[el.value ]|| "-"}</Typography>
              </>
              :""
            )
          }

          {expanded && more_details? (
            <>
            {
            moreFields.map((el,key)=>
            props[el.value] && props[el.value]!="-"?
              <>
                <Typography
                style={{ marginTop: theme.spacing(2) }}
                variant="body2"
                    >
                      {el.name} 
                </Typography>
                <Typography variant="body1">{props[el.value ]|| "-"}</Typography>
              </>
              :""
            )
            }
            </>)
          :""
          }
          {  more_details? <div
              className="d-flex"
              style={{ justifyContent: "flex-end", marginBottom: "-16px" }}
            >
              <Typography
                onClick={() => setExpanded(!expanded)}
                style={{
                  color: "#3A75CD",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                variant="body1"
              >
                {expanded ? "Less Details" : "More Details"}
              </Typography>
            </div>:""}
        </div>

        <div className={classes.cardFooter}>
          <Typography style={{ opacity: 0.7 }} variant="body1">
            Was this helpful?
          </Typography>
          <div className={classes.thumbsUp}>
            <IconButton
              onClick={() => allowUpvote && upvoteTicket()}
              style={{ background: "#cccccc" }}
            >
              <Badge
                classes={{ badge: classes.badge }}
                color="secondary"
                badgeContent={upvote > 0 ? upvote : null}
              >
                <img src={ThumbsUp} alt={"thumbs up"} />
              </Badge>
            </IconButton>
            <Typography
              style={{ opacity: 0.7, marginTop: theme.spacing(0.25) }}
              variant="subtitle2"
            >
              Yes
            </Typography>
          </div>
          <div className={classes.thumbsDown}>
            <IconButton
              onClick={() => allowDownvote && downvoteTicket()}
              style={{ background: "#cccccc" }}
            >
              <Badge
                classes={{ badge: classes.badge }}
                color="secondary"
                badgeContent={upvote < 0 ? upvote : null}
              >
                <img src={ThumbsDown} alt={"thumbs down"} />
              </Badge>
            </IconButton>
            <Typography
              style={{ opacity: 0.7, marginTop: theme.spacing(0.25) }}
              variant="subtitle2"
            >
              No
            </Typography>
          </div>
        </div>
      </Card>

      {navigator.share && (
        <Button
          onClick={() => copyLink()}
          color="primary"
          variant="outlined"
          style={{ marginTop: theme.spacing(3) }}
        >
          Share
        </Button>
      )}

      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={dialogOpen}
        autoHideDuration={2000}
        onClose={() => setDialogOpen(false)}
        message={dialogMessage}
      />
    </div>
  );
};

export default withTheme(SearchResultCard);
