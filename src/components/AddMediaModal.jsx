// pop up class

import {useState} from "react"; 
import { Dialog, DialogTitle, DialogContent } from "@mui/material"; //material ui component
import AddMedia from "./AddMedia";
import {Fab} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
export default function AddMediaModal ({lists, onMediaItemAdded}) { // Receive lists as a prop from the parent component, Home and passit down to AddMedia
    const[open, setOpen] = useState(false) // state to track whether the modal is open or closed


    return (
        <>
        {/* floating button */}
        <Fab
     
        aria-label = "add"
        onClick={() => setOpen(true)}
        sx={{ position: 'fixed', 
              bottom: 24,
              right: 24,
              backgroundColor: 'var(--color-primary)',
              color: '#ffffff',
              '&:hover': {
                backgroundColor: 'var(--color-primary-dark)',
              },
            }}
        >
        <AddIcon />
        </Fab>
           {/* the modal container that opens/closes based on the open state */}
           {/* onClose triggers when clicking outside or pressing Escape */}
            <Dialog open={open} 
                    onClose={() => setOpen(false)} 
                     
                                                   
                    // targets the white box inside the modal
                    paperprops={{                  
                            borderRadius: 'var(--radius)',
                        }
                    }
                    >
                <DialogTitle className="typography-title" 
                             sx={{
                                color: 'var(--color-primary-dark)' }}
                >
                        
                    Add New Media
                </DialogTitle>

                <DialogContent> {/* renders the form inside, passing down the lists and the close function*/}
                                        {/* Pass onMediaItemAdded down to AddMedia so Home can update its state */}

                    <AddMedia 
                    lists={lists} 
                    onClose={() => setOpen(false)}
                    onMediaItemAdded={onMediaItemAdded} />
                </DialogContent>
            </Dialog>
        </>

    );

}